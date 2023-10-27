import React from 'react';

// this component renders menu item selector and description of currently selected sub-content page
export function SubHeader(props) {

  let content;
  if (props.currentTool.slug === '') { // if current page is default page
    content = <h2>Select app</h2>;
  } else { // if current page is sub-content page

    // generate html option elements for select element
    const menuOptions = [];
    props.apps.forEach((tool) => {
      menuOptions.push(<option key={tool.slug} value={tool.slug}>{tool.title}</option>);
    });

    // menu items and descrition of currently selected sub-content page
    content = (
      <div>
        <select className="mainSelect" value={ props.currentTool.slug } onChange={props.handleToolChange}>
          { menuOptions }
        </select>
        <span>
        { props.currentTool.description }
        </span>
      </div>
    );
  }

  return (
    <div>
      { content }
    </div>
  );
}
