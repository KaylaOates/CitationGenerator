const fs = require('fs');
const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-title')(),
    require('metascraper-date')()
  ]);
  const axios = require('axios');
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
 
  const scrapeMetadata = async () => {
   
    try {
      let targetUrl = '';
      const askUrl = () => {
        return new Promise((resolve, reject) => {
          rl.question('\n------------------\nEnter Url: ', (answer) => {
            targetUrl = answer;
            resolve();
          });
        });
      };
      await askUrl();
      // Fetch the HTML of the page
      const { data: html, status } = await axios.get(targetUrl);
      if (status !== 200) {
        console.error('Failed to fetch page, status code:', status);
        return;
      }
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      
      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${month}-${day}-${year}`;
      // Scrape the metadata
      const metadata = await metascraper({ html, url: targetUrl });
  
      let Author = metadata.author;
      let Title = metadata.title;
      let Published = metadata.date;
  
      console.log('OUTPUT WEB-SCRAPING DATA:');
      console.log('Author:', Author);
      console.log('Title:', Title);
      console.log('Date:', Published);
      console.log('\n ------------------  \n');
  

      const askAuthor = () => {
        return new Promise((resolve, reject) => {
          rl.question('Reenter author\'s name if you would like to update it: ', (answer) => {
            if (answer.toLowerCase() !== '') {
              Author = answer;
            } 
            resolve();
          });
        });
      };
      
  
      const askTitle = () => {
        return new Promise((resolve, reject) => {
          rl.question('Reenter title name if you would like to update it: ', (answer) => {
            if (answer.toLowerCase() !== '') {
              Title = answer;
            } 
            resolve();
          });
        });
      };
  
      const askDate = () => {
        return new Promise((resolve, reject) => {
          rl.question('Reenter date if you would like to update it: ', (answer) => {
            if (answer.toLowerCase() !== '') {
              Published = answer;
            } 
            resolve();
          });
        });
      };
  
      await askAuthor();
      await askTitle();
      await askDate();
      
      var FinalCitation = `\n${Author} on ${Published}` + `["${Title}"][${targetUrl}][Accessed: ${currentDate}][Luke DiPersio]`;
      console.log(FinalCitation);

      fs.appendFile('Citations.txt', FinalCitation, (err) => {
        if (err) {
          console.error('An error occurred while writing to Citations.txt:', err);
        }
      });
      
      scrapeMetadata();

    } catch (error) {
      console.error('An error occurred:', error.message);
      scrapeMetadata();
    }
  };
  
  

  scrapeMetadata();
  // Declare targetURL variable (new stuff)

