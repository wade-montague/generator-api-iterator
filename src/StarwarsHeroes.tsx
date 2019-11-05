import * as React from "react";
import axios from "axios";
import { Button, Intent } from "@blueprintjs/core";

import { Intro } from "./Intro";

interface IStarwarsHeroes {
  isLoading: boolean;
  item: number;
  index: number;
  previous: [];
  iterator;
}

async function* getNextItem(page = 1) {
  var done = false;

  while (true) {
    console.log('this.done', done, page)
    const result = await axios
      .get("https://swapi.co/api/people/?page=" + page)
      .catch(() => done = true);
    if (done) {
      return;
    }
    for (const item of result.data.results) {
      yield { ...item, page };
    }
    page++;
  }
}

export class StarwarsHeroes extends React.PureComponent<{}, IStarwarsHeroes> {
  public state = {
    item: null,
    index: -1,
    iterator: null,
    isLoading: false,
    previous: []
  };

  async componentDidMount() {
    this.setState({
      iterator: getNextItem()
    });
  }

  public getNextItem = async () => {
    this.setState({ isLoading: true });
    const nextIndex = this.state.index + 1;
    const nextValue =
      nextIndex >= this.state.previous.length - 1
        ? await this.state.iterator.next()
        : this.state.previous[nextIndex];
    console.log(nextValue);

    this.setState({
      item: nextValue,
      index: nextIndex,
      isLoading: false,
      previous: [...this.state.previous, nextValue]
    });
  };

  public getPreviousItem = () => {
    const previousIndex = this.state.index - 1;

    this.setState({
      index: previousIndex,
      item: this.state.previous[previousIndex]
    });
  };

  public render() {
    const { item } = this.state;
    return (
      <Intro header="Super Go Team - Async generator api iterator">
        <h3>Star Wars Universe</h3>
        <p>
          Explore depths of a Galaxy far far far far ... very far away. Making
          use of iterator pattern via an async generator is a highly efficient
          way of provessing a stream of data. The stream can be limited within
          the generator function is require however this example will run
          indefinitly (or until the stream is no longer broadcasting)
        </p>
        <p>
          <Button
            intent={Intent.PRIMARY}
            text={!item ? `Start your journey` : `Get next hero`}
            onClick={this.getNextItem}
            disabled={this.state.isLoading}
          />
          <Button
            intent={Intent.WARNING}
            text={"Return to the Jedi"}
            onClick={this.getPreviousItem}
            disabled={this.state.isLoading || this.state.index <= 0}
          />
        </p>
        {item && item.value && (
          <div>
            <h4>Meet {item.value.name}</h4>
            <p>name: {item.value.name}</p>
            <p>height: {item.value.height}</p>
            <p>mass: {item.value.mass}</p>
            <p>hair_color: {item.value.hair_color}</p>
            <p>skin_color: {item.value.skin_color}</p>
            <p>eye_color: {item.value.eye_color}</p>
            <p>birth_year: {item.value.birth_year}</p>
            <p>gender: {item.value.gender}</p>
            <p>homeworld: {item.value.homeworld}</p>
            <p>films: {item.value.films}</p>
            <p>species: {item.value.species}</p>
            <p>vehicles: {item.value.vehicles}</p>
            <p>starships: {item.value.starships}</p>
            <p>created: {item.value.created}</p>
            <p>edited: {item.value.edited}</p>
            <p>url: {item.value.url}</p>
          </div>
        )}
        {item && item.done && (
          <p>
            Well done, you now know the entire Star Wars Universe... Its very
            unlikely you actually ever get to see this.
          </p>
        )}
      </Intro>
    );
  }
}
