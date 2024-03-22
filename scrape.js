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
  
  const scrapeMetadata = async (targetUrl) => {
    try {
      // Fetch the HTML of the page
      const { data: html, status } = await axios.get(targetUrl);
      if (status !== 200) {
        console.error('Failed to fetch page, status code:', status);
        return;
      }
  
      // Scrape the metadata
      const metadata = await metascraper({ html, url: targetUrl });
  
      let Author = metadata.author;
      let Title = metadata.title;
      let Date = metadata.date;
  
      console.log('OUTPUT WEB-SCRAPING DATA:');
      console.log('Author:', Author);
      console.log('Title:', Title);
      console.log('Date:', Date);
      console.log('\n ------------------  \n');
  
      const askAuthor = () => {
        return new Promise((resolve, reject) => {
          rl.question('Would you like to re-enter the author\'s name? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
              rl.question('Enter author\'s name: ', (author) => {
                Author = author;
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
      };
  
      const askTitle = () => {
        return new Promise((resolve, reject) => {
          rl.question('Would you like to re-enter the Title? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
              rl.question('Enter title: ', (title) => {
                Title = title;
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
      };
  
      const askDate = () => {
        return new Promise((resolve, reject) => {
          rl.question('Would you like to re-enter the Date? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
              rl.question('Enter date: ', (date) => {
                Date = date;
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
      };
  
      await askAuthor();
      await askTitle();
      await askDate();
  
      console.log("\n UPDATED OUTPUT:");
      console.log('Author:', Author);
      console.log('Title:', Title);
      console.log('Article Date:', Date);

  
      rl.close();
  
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };
  
  const targetUrl = 'https://www.nasa.gov/technology/nasas-network-of-small-moon-bound-rovers-is-ready-to-roll/';
  scrapeMetadata(targetUrl);
  