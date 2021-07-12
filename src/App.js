import './App.css';
import MenuButtonSvg from './Components/Atoms/MenuButtonSvg/MenuButtonSvg';
import OrangeButton from './Components/Atoms/OrangeButton/OrangeButton';
import Background1 from './Components/Template/Background1/Background1';
import Background2 from './Components/Template/Background2/Background2';
import Background3 from './Components/Template/Background3/Background3';
import Background4 from './Components/Template/Background4/Background4';
import Background5 from './Components/Template/Background6/Background6';
function App() {
  return (
    <div>
      <Background5>
        <OrangeButton text="ABC" size="medius"/>
        <MenuButtonSvg text="Login" source="image/svg/search.svg"/>
      </Background5>
    </div>
  );
}

export default App;
