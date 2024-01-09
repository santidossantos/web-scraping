import * as cheerio from 'cheerio';
import {Site} from '../models';
import axios from 'axios';

export async function processSite(site: Site) {
  if (!site.domain) {
    throw new Error('Site domain is not defined');
  }
  if (!site.extractor) {
    throw new Error('Site extractor is not defined');
  }

  const pages: [] = [];
  const startUrl = site.domain;
  const depth = parseInt(site.maxDepth, 10);
  const extractor = site.extractor;
  await scrapeRecursive(startUrl, depth);

  async function loadPage(url: string) {
    try {
      const response = await axios.get(url, {
        responseEncoding: 'latin1',
      });
      return cheerio.load(response.data);
    } catch (error) {
      console.error('Cannot load url', url, 'Error:', error.message);
      return cheerio.load('');
    }
  }

  /* 
      Evalua el codigo JS en el string extractor y devuelve una funcion 
      que ya tiene el DOM que cargo cheerio
      $ representa el dom cargado por cheerio 
  */
  function evaluateExtractor($: cheerio.CheerioAPI) {
    const fn = eval(extractor);
    return fn($);
  }

  async function scrapeRecursive(currentUrl: string, currentDepth: number) {
    if (currentDepth > 0) {
      const $ = await loadPage(currentUrl);
      const page = evaluateExtractor($);
      page.url = currentUrl;
      pages.push(page as never);

      const links: string[] = [];
      $('a').each((i, element) => {
        const href = $(element).attr('href');
        if (href) {
          links.push(href);
        }
      });

      for (const link of links) {
        const absoluteLink = new URL(link, currentUrl).href;
        await scrapeRecursive(absoluteLink, currentDepth - 1);
      }
    }
  }

  return pages; // Retorno paginas procesadas
}

/*  
      Prints utiles para debuggear
      console.log(data);
      console.log(links);
      console.log('------------------');
      console.log('\n\n'); 
*/
