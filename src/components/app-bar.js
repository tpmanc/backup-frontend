import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';


export default function MyAppBar(props) {
    const {text} = props
    let [count, setCount] = useState(0);

    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        document.title = `${count} - ${text}`;
    });

    function buttonClick () {
        count += 1
        setCount(count)
    }

    return (
        <div>
            { text }
            <br />
            <Button variant="contained" color="primary" onClick={buttonClick}>
                Hello World { count }
            </Button>
        </div>
    )
}