import React, { Component } from 'react';
import {Segment, Container, Image} from 'semantic-ui-react'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Segment inverted vertical style={{padding: '2em 0em' }}>
            <Container>
                <h4>2021 © Ellyn Golden and Sophia Richardson</h4>
                <Image 
                    as='a' 
                    href="https://github.com/ejgolden94/on-belay" 
                    target="_blank" 
                    src='/github_mark.png'
                    style={{maxWidth:'30px', display:'inline-block'}}/>
            </Container>
            </Segment>
        )
    }
}