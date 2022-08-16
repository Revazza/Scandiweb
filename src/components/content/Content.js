import React, { Component } from 'react';
import styles from './Content.module.scss';
import CategoryContext from '../../context/CategoryContext';

class Content extends Component {

  constructor()
  {
    super();
    this.state = {
      items:[],
    }
  }

  componentDidMount()
  {
    
  }

  render() {
    return (
      <div>Content</div>
    )
  }
}

export default Content