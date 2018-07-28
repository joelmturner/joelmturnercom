// from https://gist.github.com/nealfennimore/87cdca892bd874a422a2e5eb391d8376
import { Component } from 'react'
// import React, {Component, PropTypes} from 'react';

const isBrowser = typeof window === 'object'

export default class CodePen extends Component {
  constructor(props) {
    super(props)

    this.timer = null
  }

  componentDidMount() {
    if (!isBrowser) {
      return
    }

    if (this.hasScript()) {
      this.timer = setTimeout(window.__CPEmbed, this.props.delay)
    } else {
      this.timer = setTimeout(this.injectScript, this.props.delay)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  hasScript() {
    return !!window.__CPEmbed
  }

  injectScript() {
    const script = document.createElement('script')

    script.async = true
    script.type = 'text/javascript'
    script.src = '//production-assets.codepen.io/assets/embed/ei.js'

    document.head.appendChild(script)
  }

  render() {
    return null
  }
}

CodePen.defaultProps = {
  delay: 1000,
}

// CodePen.propTypes = {
//     delay: PropTypes.number
// };
