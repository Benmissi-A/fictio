import Header from '../organisms/Header';
import Origin from '../organisms/OriginOrganism';
import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModalVersioningTemplate from './modal-versioning-template';

const OriginTemplate = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('alternate');
    const [modalVersioning, setModalVersioning] = useState('alternateVersioning');
    const [activeUuid, setActiveUuid] = useState('uuid');
    const [activeNarrative, setActiveNarrative] = useState(null);

    const useStyles = makeStyles((theme) => ({
        versioning: {
          position: 'absolute',
          top:'0px',
          left:'0px',
          background: 'black',
          color: 'white',
          width: '100%',
          height:'100%',
          margin: 'auto',
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
        },
      }));


    // const classes = useStyles();

    // const content = (
    //     <div className={classes.versioning} >
    //         <div className="cross" onClick={ToggleSatusModal}>
    //             <CrossDelete />
    //         </div>
    //         <article>
    //             <div>
    //                 <p>
    //                     {modalContent}
    //                 </p>
    //                 <button onClick={handleSaveAndClose}>SAVE AND CLOSE</button>
    //             </div>
    //             <div>
    //                 {modalVersioning}
    //             </div>
    //         </article>
    //         <style global jsx>{`
    //         .cross {
    //             position:absolute;
    //             top:20px;
    //             right:20px;
    //         }
    //             article {
    //                 width:100%;
    //                 display:flex;
    //                 flex-direction:row;
    //                 justify-content:center;
    //                 padding-top:20px;
    //             }
    //             div {
    //                 margin: 0px 10px 0px 10px ;
    //                 padding:0 5% 0 5% 0 5% 0 5%;
    //                 flex-direction:column;
    //             }
    //             p {
    //                 padding: 10px 20px;
    //                 background: #262626;
    //                 color: white;
    //                 max-width: 650px;
    //                 border-radius: 5px;
    //                 min-height: 45px;
    //                 /* max-height: 150px; */
    //                 margin-bottom : 10px;
    //             }
    //             button {
    //                 display:block;
    //                 margin:auto;
    //                 background: black;
    //                 color:white;
    //                 border:1px solid white;
    //                 border-radius: 5px;
    //                 text-align:center;
    //                 padding:10px 10px 10px 10px;
    //             }
    //         `}</style>
    //     </div>
    // );

    //  function ToggleSatusModal() {
    //     if (isOpen === true) {
    //         setIsOpen(false);
    //     } else {
    //         setIsOpen(true);
    //     }
    //   } 

    // function handleSaveAndClose() {
    //     alert('save');
    //     ToggleSatusModal();
        
    // }

    function openModalOriginTemplate(uuid) {
        
        // get data
        fetch(process.env.edoAPIUrl + 'narratives/' + uuid + '.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        })
        .then(data => {
                // we need to create a variable to keep the data, if not, states are not changed
                const narrative = data;
                setModalContent(narrative.content);
                setModalVersioning( narrative.fragments.map(fragment => (<p key={fragment.uuid}>{fragment.content}</p>)));
                setActiveNarrative(narrative);
                setActiveUuid(uuid);
                setIsOpen(true);
        })
        .catch((networkError) => {
            console.log('Error when fetching in origin template : ' + networkError.message);
          });
        ;

        console.log(activeNarrative);
    }

    // // my fetch narrative function
    //   function getNarrative(uuid) {
    //     fetch(process.env.edoAPIUrl + 'narratives/'+uuid+'.json')
    //     .then(response => {
    //         console.log('mais nonnn');
    //         return response.json();
    //     })
    //     .then(data => {
    //             setModalContent(data.content);
    //             setModalVersioning( data.fragments.map(fragment => (<p key={fragment.uuid}>{fragment.content}</p>)));
    //             setActiveNarrative(data)
    //     })
    //     .then(data => {
    //         setIsOpen(true);
    //     });
    // }
 
    return (
        <div>
            <Header />
            <div className="container">

                <ModalVersioningTemplate 
                    narrativeUuid={activeUuid}
                    content={modalContent}
                    narrative={activeNarrative}
                    isOpen={isOpen}
                />
                <Origin
                    narratives={props.narratives} 
                    openModal={openModalOriginTemplate}
                />
            </div>
            <style jsx>{`
                .container {
                    background: black;
                }
            `}</style>
        </div>
    );
}

export default OriginTemplate;