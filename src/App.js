import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import MainPage from './Components/Page/MainPage/MainPage';
import AdminPage from './Components/Page/AdminPage/AdminPage';
import Main from './Components/Page/AdminPage/Main';
import LoginPage from './Components/Page/LoginPage/LoginPage';
import PaymentPage from './Components/Page/PaymentPage/PaymentPage';
import NavBar from './Components/MoreClues/NavBar/NavBar';
import ReviewPage from './Components/Page/ReviewPage/BookDetailsScreen'
import {useLoader} from './Context/LoaderProvider';
import LoaderScreen from './Components/MoreClues/LoaderScreen/LoaderScreen';
import {useAuth} from './Context/AuthProvider'
import UserPage from './Components/Page/UserPage/UserPage';
function App() {
  const {isLoading} = useLoader();
  const {currentUser} = useAuth();
  return (
      <div className="container">
          <NavBar/>
          {
            isLoading?<LoaderScreen/>:<div/>
          }
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/adminPage" component={Main}/>
          <Route path="/loginPage" component={LoginPage}/>
          <Route path="/paymentPage" component={PaymentPage}/>
          <Route path="/reviewPage" component={ReviewPage}/>
          <Route path="/userPage" component={UserPage}/>
        </Switch>
      </div>

  
  
  );
}

export default App;
