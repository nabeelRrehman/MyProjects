// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import './ProductCard.css'

// const styles = {
//     card: {
//         maxWidth: 345,
//     },
//     media: {
//         objectFit: 'cover',
//     },
// };

// class ImgMediaCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             item: props.item
//         }
//         this.delete = this.delete.bind(this);
//         this.details = this.details.bind(this);
//     }

//     delete(key) {
//         console.log(key)
//     }

//     details(key) {
//         console.log(key)
//     }

//     render() {
//         const { item } = this.state;
//         const { classes } = this.props
//         return (
//             <Card className={classes.card}>
//                 <CardActionArea onClick={() => {this.details(item.key)}}>
//                     <CardMedia
//                         component="img"
//                         alt="Contemplative Reptile"
//                         className={classes.media}
//                         height="140"
//                         image={item.data.images[0].image}
//                         title="Contemplative Reptile"
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="h2">
//                             {item.data.name}
//                         </Typography>
//                         <Typography component="p">
//                             {item.data.summarySpecs}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions>
//                     <Button size="small" color="secondary" onClick={() => { this.delete(item.key) }}>
//                         Delete
//                     </Button>
//                     <Button size="small" color="primary" onClick={() => { this.details(item.key) }}>
//                         Learn More
//                     </Button>
//                 </CardActions>
//             </Card>
//         );
//     }

// }

// ImgMediaCard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ImgMediaCard);

import React, { Component } from 'react';
import './ProductCard.css'
import Button from '@material-ui/core/Button';

class ImgMediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        }
        this.delete = this.delete.bind(this);
        this.details = this.details.bind(this);
    }

    delete(key) {
        console.log(key)
    }

    details(key) {
        console.log(key)
    }

    render() {
        const { item } = this.state;
        return (
            <div className={"ProductDiv"}>
                <div className={"Divo1"}>
                    <div>
                        <img src={item.data.images[0].image} />
                    </div>
                </div>
                <div className={"Divo2"}>
                    <div>
                        {item.data.date}
                    </div>
                    <div>
                        {item.data.name.toUpperCase()}
                    </div>
                    <div>
                        {item.data.brand}
                    </div>
                </div>
                <div className={"Divo3"}>
                    {/* <Button size={"small"} color={"secondary"} variant={"outlined"} onClick={() => { console.log(item.key) }}>Delete</Button>
                    <br /> */}
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => { console.log(item.key) }}>Details</Button>
                </div>
            </div>
        )
    }
}

export default ImgMediaCard