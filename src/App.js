import React from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

// app's  components with more general content
import { SubHeader } from './components/SubHeader';

// app's components with main sub-content (content pages or "apps")
import { ReactionTimeTest } from './components/apps/reaction-time-test/ReactionTimeTest';
import { LoremIpsumGenerator } from './components/apps/lorem-ipsum-generator/LoremIpsumGenerator';
import { FavoriteSymbols } from './components/apps/favorite-symbols/FavoriteSymbols';
import { ApiTester } from './components/apps/api-tester/ApiTester';
import { DefaultPage } from './components/apps/default-page/DefaultPage';

// database of sub-content components and related data
const apps = [
  {
    slug: '',
    component: <DefaultPage />,
    title: '_react demo apps',
    description: 'Default page'
  },
  {
    slug: 'reaction-time-test',
    component: <ReactionTimeTest />,
    title: 'Reaction time test',
    description: 'Measure your reaction time'
  },
  {
    slug: 'lorem-ipsum-generator',
    component: <LoremIpsumGenerator />,
    title: 'Lorem ipsum generator',
    description: 'Generate lorem ipsum text'
  },
  {
    slug: 'favorite-symbols',
    component: <FavoriteSymbols />,
    title: 'Favorite symbols',
    description: 'Manage your emergency emoji kit'
  },
  {
    slug: 'api-tester',
    component: <ApiTester />,
    title: 'API tester',
    description: 'REST API testing tool'
  }
]

// root component
function App() {

  // react hook providing current url location
  const location = useLocation();

  // handling selectbox change in order to redirect between sub-content components (pages)
  const navigate = useNavigate(); // hooks should always be declared inside functional components but outside nested functions or if statements
  const handleToolChange = (e) => {
    const pathname = '/' + e.target.value;
    navigate(pathname); // react router functionality for "fast" redirection without refreshing whole page
  }

  // rendering sub-content components (pages) of website using react-router-dom library
  const componentRoutes = [];
  apps.forEach((tool, index) => {
    let path = '/' + tool.slug;
    let element = tool.component;
    componentRoutes.push(
      <Route path={path} element={element} key={index} />
    );
  });

  // data about current sub-content page
  const getCurrentTool = () => {
    let arr = Object.keys(apps);
    for(let i = 0; i < arr.length; i++) {
      if (location.pathname.replace('/', '') === apps[i].slug) {
        return apps[i];
      }
    }
    console.log('current tool info not detected');
    return false;
  }
  const currentTool = getCurrentTool();

  return (
    <div>
      <header>
        <h1><Link to="/">_react demo apps</Link></h1>
      </header>
      <article>
        <div>
          { <SubHeader currentTool={currentTool} handleToolChange={handleToolChange} apps={apps} /> }
        </div>
        <Routes>
          { componentRoutes }
        </Routes>
      </article>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

export { apps };
export default App;
