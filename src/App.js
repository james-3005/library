import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import MainPage from './Components/Page/MainPage/MainPage';
import AdminPage from './Components/Page/AdminPage/AdminPage';
import LoginPage from './Components/Page/LoginPage/LoginPage';
import PaymentPage from './Components/Page/PaymentPage/PaymentPage';
import ReviewPage from './Components/Page/ReviewPage/ReviewPage';
import {useLoader} from './Context/LoaderProvider';
import LoaderScreen from './Components/MoreClues/LoaderScreen/LoaderScreen';
import {useAuth} from './Context/AuthProvider'
function App() {
  const {isLoading} = useLoader();
  const {currentUser} =useAuth();
  console.log(currentUser);
  return (
      <div>
          {
            isLoading?<LoaderScreen/>:<div/>
          }
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/adminPage" component={AdminPage}/>
          <Route path="/loginPage" component={LoginPage}/>
          <Route path="/paymentPage" component={PaymentPage}/>
          <Route path="/reviewPage" component={ReviewPage}/>
        </Switch>
      </div>

  
  
  );
}

export default App;
