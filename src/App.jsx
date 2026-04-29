import { Button, Input, Card, Avatar, LoadingSpinner, ErrorMessage } from "./components/shared";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>UI Components Test</h1>

      <Card>
        <Avatar src="https://via.placeholder.com/40" />
        <Input label="Name" placeholder="Enter your name" />
        <Button>Submit</Button>
        <LoadingSpinner />
        <ErrorMessage message="Something went wrong" />
      </Card>
    </div>
  );
}

export default App;