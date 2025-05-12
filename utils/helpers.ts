import { APIRequestContext, expect, Page } from '@playwright/test';
import Sitemapper from 'sitemapper';


export async function fetchSitemapUrls(baseURL: string): Promise<string[]> {
    const sitemapUrl = new URL('/sitemap.xml', baseURL).toString();
    console.log(`Resolved sitemap URL: ${sitemapUrl}`);
    const sitemap = new Sitemapper({ url: sitemapUrl });
    sitemap.timeout = 30000;
    const { sites } = await sitemap.fetch();
    console.log(`Found ${sites.length} URLs in sitemap`);
    expect(sites.length, 'Expected at least one URL in sitemap').toBeGreaterThan(0);
    return sites;
}

export async function verifyUrlsAccessible(request: APIRequestContext, urls: string[]): Promise<void> {
    for (const url of urls) {
        console.log(`Checking accessibility of ${url}`);
        const res = await request.get(url);
        console.log(`  ${url} returned status ${res.status()}`);
        expect(res.status(), `Expected ${url} to be accessible (status < 400)`).toBeLessThan(400);
    }
}

export async function getAllLinksFromPage(page: Page): Promise<Set<string>> {
    console.log('Extracting all links from page');
    const links = page.locator('a[href]');
    const allLinkEls = await links.all();
    const allLinkHrefs = await Promise.all(
        allLinkEls.map(link => link.getAttribute('href'))
    );

    const validHrefs = allLinkHrefs.reduce((set, href) => {
        expect.soft(href, 'link has no a proper href').not.toBeFalsy();
        if (href && !href.startsWith('mailto:') && !href.startsWith('#')) {
            set.add(new URL(href, page.url()).href);
        }
        return set;
    }, new Set<string>());

    console.log(`Extracted ${validHrefs.size} unique links`);
    return validHrefs;
}