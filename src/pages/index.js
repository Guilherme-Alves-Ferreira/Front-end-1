import React from 'react';
import ReactDOM from 'react-dom';
import UploadFile from './UploadFile';

function Index(){
    return(
    ReactDOM.render(<UploadFile />, document.getElementById('root'))
);

}
export default Index;