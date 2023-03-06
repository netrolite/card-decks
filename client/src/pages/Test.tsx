import { FC } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";

interface Props {

}

interface IItems {
  name: string
}

const Test: FC<Props> = () => {
  const data = useLoaderData() as IItems[]; // data returned by loader function
  const actionData = useActionData(); // data returned by action function

  const nodes = data.map((item, i) => (
    <div className="item" key={i}>{item.name}</div>
  ))
  console.log("data returned by loader:");
  console.log(data);
  return (
    <>
      <div>{nodes}</div>
      <Form method="post">
        <label htmlFor="form-deck-name">Deck name</label>
        <input type="text" id="form-deck-name" name="deck-name" />

        <label htmlFor="form-name">Your name</label>
        <input type="text" id="form-name" name="name" />

        <button>Submit</button>
      </Form>
    </>
  )
}

export default Test;