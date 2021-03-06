import IconAdd from '../../atoms/IconAdd/IconAdd';
import IconRestore from '../../atoms/IconRestore/IconRestore';
import IconSave from '../../atoms/IconSave/IconSave';

const NarrativeMenu = props => {
    function openModal() {    
       props.openModal();
    }

    return (
        <article className='element'>
            <IconAdd />
            <IconRestore openModal={openModal} />
            <IconSave />

            <style jsx>{`
                .element {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px;
                    width: 120px;
                }

                .hidden {
                    visibility: hidden;
                }
            `}</style>
        </article>
    );
}

export default NarrativeMenu;