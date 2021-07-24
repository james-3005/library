import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import MainPage from './Components/Page/MainPage/MainPage';
import Main from './Components/Page/AdminPage/Main';
import UserAdminPage from './Components/Page/AdminPage/UserAdminPage';
import LoginPage from './Components/Page/LoginPage/LoginPage';
import HistoryPage from './Components/Page/HistoryPage/HistoryPage';
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
          <Route path="/UserAdminPage" component={UserAdminPage}/>
          <Route path="/HistoryPage" component={HistoryPage}/>
        </Switch>
      </div>

  
  
  );
}

export default App;
