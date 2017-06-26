import React from "react";
import PropTypes from 'prop-types';
import {Card, Label, Image, Header, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default class GameInformationCard extends React.Component {

    getImages (img) {
        if (img != null) {
            return <Image src={img} />;
        }
        return (
            <Segment inverted color='blue'>
                <Header textAlign='center'>Não há imagem cadastrada!</Header>
            </Segment>
        );
    }
    
    mountGenreTags(){
        return this.props.genres.map((genre,index) => { 
            return (<Link key={index} to={`/games/${genre.name}`} >
                        <Label color='green'>
                            {genre.name} 
                        </Label>
                    </Link>
                    )
         })
    }

    
    render () {

        return (
            <Card fluid>
                {this.getImages(this.props.cover_image)}

                <Card.Content>

                  <Card.Description>

                        <p>{ this.props.getFields('Versão: ',this.props.version,'') }</p>
                        <p>{ this.props.getFields('Ano de lançamento: ',this.props.launch_year,'') }</p>
                        <p><h7><strong>Gêneros: </strong></h7></p> {this.mountGenreTags()
                        }
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {this.props.getFields('Repositório Oficial: ',
                        <Link to={`this.props.official_repository`}>{this.props.official_repository}</Link>)}
                </Card.Content>
            </Card>
        );

    }
}

GameInformationCard.propTypes = {
    cover_image: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    launch_year: PropTypes.number.isRequired,
    genres: PropTypes.array.isRequired,
    official_repository: PropTypes.string.isRequired,
    getFields: PropTypes.func.isRequired,
}
