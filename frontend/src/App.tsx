import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from "react-bootstrap";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='*' component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
