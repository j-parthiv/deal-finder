"use server"

import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string){
    if(!url) return;
 
    // Bringhtdata Proxy Configuration
    const username = String(process.env.BRIGHTDATA_USERNAME);
    const password = String(process.env.BRIGHTDATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password: password
        },
        host: `brd.superproxy.io`,
        port,
        rejectUnauthorized: false,
        }

        try {
            // Fetch the product page
            const response = await axios.get(url, options)
            const $ = cheerio.load(response.data);

            // Extract the product details
            const title = $("#productTitle").text().trim();
            const currentPrice = extractPrice();
            console.log(title);

        } catch (error: any) {
            throw new Error(`Failed to scrape Amazon product: ${error.message}`);
            
        }
    }