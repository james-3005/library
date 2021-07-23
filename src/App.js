import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import MainPage from './Components/Page/MainPage/MainPage';
import AdminPage from './Components/Page/AdminPage/AdminPage';
import Main from './Components/Page/AdminPage/Main';
import LoginPage from './Components/Page/LoginPage/LoginPage';
import PaymentPage from './Components/Page/PaymentPage/PaymentPage';
import ReviewPage from './Components/Page/ReviewPage/ReviewPage';
import BookDetailsScreen from './Components/Page/BookDetail/BookDetailsScreen';
function App() {
  return (
      <div>
      
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/adminPage" component={Main}/>
          <Route path="/loginPage" component={LoginPage}/>
          <Route path="/paymentPage" component={PaymentPage}/>
          <Route path="/reviewPage" component={ReviewPage}/>
          <Route path="/BookDetail" component={BookDetailsScreen}/>
        </Switch>
      </div>

  
  
  );
}

export default App;
