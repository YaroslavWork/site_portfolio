import './App.css';
import Button from './components/Button/Button';

function App() {
  return (
    <>
    <Button 
      text="Click Me" 
      isPrimary={true} 
      onKeyClick={() => console.log('Primary button clicked!')}
    />
    <Button 
      text="And Me" 
      isPrimary={false} 
      onKeyClick={() => console.log('Secondary button clicked!')}
    />
    </>
  );
}

export default App;
