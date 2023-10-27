import React from 'react';
import { Link } from 'react-router-dom';

// data about sub-content pages
import { apps } from '../../../App.js';

// main purpose of this component is to render main menu
export function DefaultPage(props) {

  const items = [];

  apps.forEach((item, index) => {
    if (index > 0) { // do not need to render item with index "0" because it is default page or "home page"
      items.push(
        <li key={index}>
          <Link to={'/' + item.slug} style={{fontWeight: 'bold'}} >
            {item.title}
          </Link>
          <br/ >
          <span>{item.description}</span>
        </li>
      )
    }
  })

  return (
    <div>
      <ul>
        {items}
      </ul>
    </div>
  );
}
