const metascraper = require('metascraper')([ 
    require('metascraper-author')(), 
    require('metascraper-title')(), 
    require('metascraper-date')() 
  ]) 
  const axios = require('axios') 
    
  const scrapeMetadata = async (targetUrl) => { 
    try { 
      // Fetch the HTML of the page 
      const { data: html, status } = await axios.get(targetUrl) 
      if (status !== 200) { 
        console.error('Failed to fetch page, status code:', status) 
        return 
      } 
    
      // Scrape the metadata 
      const metadata = await metascraper({ html, url: targetUrl }) 
      console.log('Author:', metadata.author) // Output the author 
      console.log('Title:', metadata.title)   // Output the title 
      console.log('Date:', metadata.date) 	// Output the date 
    } catch (error) { 
      console.error('An error occurred:', error.message) 
    } 
  } 
    
  // Replace 'YOUR_URL_HERE' with the URL you want to scrape 
  const targetUrl = 'https://www.nasa.gov/technology/nasas-network-of-small-moon-bound-rovers-is-ready-to-roll/' 
  scrapeMetadata(targetUrl) 
  