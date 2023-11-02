import React from 'react';

import { Input } from './Input';
import { Output } from './Output';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

export function LoremIpsumGenerator() {

  // object containing data about what string should be generated and resulted string
  const [data, setData] = useState({
    count: 1, // selected value of count (how many times to generate given "type" of string)
    type: 'Paragraphs', // selected type of string to be generated
    types: ['Paragraphs', 'Sentences', 'Words'], // items (types of strings to be generated) for select dropdown menu
    firstWords: false, // determines if generated string begins with "lorem ipsum"...
    output: '' // here will be stored generated output string
  });

  // database of words for creating "lorem ipsum" dummy string
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'et', 'in', 'mauris', 'sed', 'ut', 'vel', 'vitae', 'eget', 'non', 'etiam', 'nulla', 'vestibulum', 'donec', 'urna', 'ac', 'arcu', 'nec', 'at', 'id', 'massa', 'neque', 'nunc', 'quis', 'velit', 'elit', 'libero', 'suspendisse', 'a', 'justo', 'gravida', 'morbi', 'pellentesque', 'sodales', 'aliquam', 'eu', 'lacus', 'lobortis', 'metus', 'odio', 'turpis', 'ante', 'diam', 'dui', 'felis', 'vivamus', 'volutpat', 'interdum', 'maecenas', 'nam', 'orci', 'pede', 'cras', 'enim', 'magna', 'mi', 'mollis', 'nibh', 'praesent', 'tellus', 'commodo', 'fusce', 'integer', 'ligula', 'nullam', 'porttitor', 'quisque', 'sem', 'tempus', 'aenean', 'consequat', 'faucibus', 'lectus', 'leo', 'molestie', 'porta', 'proin', 'rhoncus', 'risus', 'tempor', 'tincidunt', 'ultrices', 'vulputate', 'adipiscing', 'augue', 'consectetuer', 'duis', 'elementum', 'feugiat', 'mattis', 'nonummy', 'placerat', 'quam', 'suscipit', 'vehicula', 'viverra', 'bibendum', 'egestas', 'erat', 'lacinia', 'laoreet', 'malesuada', 'nisl', 'phasellus', 'pulvinar', 'purus', 'sapien', 'tortor', 'tristique', 'wisi', 'convallis', 'dapibus', 'eros', 'ornare', 'ullamcorper', 'ultricies', 'venenatis', 'ad', 'auctor', 'est', 'imperdiet', 'luctus', 'posuere', 'rutrum', 'sollicitudin', 'curabitur', 'cursus', 'dictum', 'dignissim', 'fermentum', 'fringilla', 'iaculis', 'litora', 'sagittis', 'taciti', 'blandit', 'euismod', 'facilisis', 'hendrerit', 'hymenaeos', 'netus', 'parturient', 'potenti', 'pretium', 'scelerisque', 'torquent', 'accumsan', 'condimentum', 'congue', 'conubia', 'cum', 'eleifend', 'facilisi', 'fames', 'hac', 'mus', 'nascetur', 'penatibus', 'pharetra', 'senectus', 'varius', 'aptent', 'aut', 'dictumst', 'excepturi', 'habitasse', 'montes', 'natoque', 'nihil', 'platea', 'provident', 'semper', 'sociis', 'ullam', 'voluptas', 'aliqua', 'aliquet', 'aliquid', 'architecto', 'asperiores', 'aute', 'beatae', 'cillum', 'class', 'consequatur', 'curae', 'delectus', 'dis', 'dolorem', 'dolorum', 'earum', 'eos', 'esse', 'fugiat', 'fugit', 'harum', 'magnis', 'maxime', 'molestiae', 'natus', 'nostra', 'numquam', 'primis', 'quasi', 'qui', 'rerum', 'ridiculus', 'sint', 'veniam', 'veritatis', 'vero', 'voluptatem', 'per', 'habitant', 'sociosqu', 'perferendis', 'adipisci', 'autem', 'consectetur', 'culpa', 'cupiditate', 'diamlorem', 'distinctio', 'eiusmod', 'eum', 'eveniet', 'exercitation', 'illum', 'iure', 'laboriosam', 'laudantium', 'magnam', 'minus', 'mollit', 'mollitia', 'nobis', 'officiis', 'quaerat', 'quas', 'quia', 'similique', 'voluptates', 'voluptatibus', 'nisi', 'himenaeos', 'inceptos'];

  // main function for generating desired string
  const generate = (e) => {

    // processing user inputs
    let selectedCount;
    let selectedType;
    let selectedFirstWords;
    if (typeof e === 'undefined') { // when function is called via useEffect (on page load)
      selectedCount = data.count;
      selectedType = data.type;
      selectedFirstWords = data.firstWords;
    } else { // when function is called via event handler (user action)
      selectedCount = e.target.name === 'count' ? parseInt(e.target.value) : data.count;
      selectedType = e.target.name === 'type' ? e.target.value : data.type;
      selectedFirstWords = e.target.name === 'firstWords' ? e.target.checked : data.firstWords;
    }

    // returns random value from given array
    const randVal = (arr) => {
      let randIndex = Math.floor(Math.random() * arr.length);
      return arr[randIndex];
    }

    // capitelizes first letter of given string
    const capFirst = (string) => {
      let firstLetter = string.slice(0, 1);
      let rest = string.slice(1);
      return firstLetter.toUpperCase() + rest;
    }

    // returns random whole number from given range (inclusive cutoffs)
    const randomizeLength = (dn, up) => {
      let range = up - dn;
      return Math.round((Math.random() * range) + dn);
    }

    // returns string consisting of given number of words (first argument) separated by separator
    // when second argument is "true", then words will always start in specific sequence
    const generateWords = (count, selectedFirstWords) => {

      let string = ''; // result string
      let separator = ' '; // word separator
      let word;

      for(let i = 0; i < count; i++) {

        // begin with "Lorem ipsum dolor sit amet"
        if (selectedFirstWords && i < 5) {
          word = words[i];
        } else {
          word = randVal(words);
        }

        string += word;

        // adding separator
        if (i < (count - 1)) {
          string += separator;
        }
      }

      return string;
    }

    // returns string consisting of given number of sentences (first argument) separated by separator
    // when second argument is "true", then first sentence will always start in specific sequence of words
    const generateSentences = (count, selectedFirstWords) => {

      let string = ''; // result string
      let dot = '.'; // part of sentence separator
      let space = ' '; // part of sentence separator

      for(let i = 0; i < count; i++) {

        // begin with "Lorem ipsum dolor sit amet"
        if (i > 0 && selectedFirstWords) {
          selectedFirstWords = false;
        }

        let sentence = generateWords(randomizeLength(2, 10), selectedFirstWords); // generating random words for sentence
        string += capFirst(sentence); // we want the sentence begin with upper case letter

        // adding dot after every sentence
        string += dot;

        // adding space after every sentence, except last one
        if (i < (count - 1)) {
          string += space;
        }
      }

      return string;
    }

    // returns string consisting of given number of paragraphs (first argument) separated by separator
    // when second argument is "true", then first sentence of first paragraph will always start in specific sequence of words
    const generateParagraphs = (count, selectedFirstWords) => {

      let string = ''; // result string
      let separator = '\n'; // paragraph separator

      for(let i = 0; i < count; i++) {

        // begin with "Lorem ipsum dolor sit amet"
        if (i > 0 && selectedFirstWords) {
          selectedFirstWords = false;
        }

        // generating and adding sentence to paragraph
        let sentences = generateSentences(randomizeLength(3, 8), selectedFirstWords);
        string += sentences;

        // adding separator after every paragraph, except last one
        if(i < (count - 1)) {
          string += separator;
        }
      }

      return string;
    }

    // constructing result string
    let generatedString;
    switch(selectedType) {
      case 'Paragraphs':
        generatedString = generateParagraphs(selectedCount, selectedFirstWords);
        break;
      case 'Sentences':
        generatedString = generateSentences(selectedCount, selectedFirstWords);
        break;
      default:
        generatedString = generateWords(selectedCount, selectedFirstWords);
    }

    // updating react state
    setData({
      ...data,
      count: selectedCount,
      type: selectedType,
      firstWords: selectedFirstWords,
      output: generatedString
    });
  }

  // initializing our main function on component load
  // second argument (empty array "[]") needed to avoid infinite loop
  // the comment begining with "eslint" is to disable warning from react about empty dependendy aray
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="LoremIpsumGenerator">
      <Input data={data} handleChange={generate} />
      <Output outputString={data.output} charCount={data.output.length} wordList={words} />
    </div>
  );
}

// managing prop types
Input.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}
Output.propTypes = {
  outputString: PropTypes.string.isRequired,
  charCount: PropTypes.number.isRequired,
  wordList: PropTypes.array.isRequired
}
