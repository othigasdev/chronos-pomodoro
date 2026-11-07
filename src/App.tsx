import './styles/theme.css'
import './styles/global.css'
import { Heading } from './components/Heading'
import { TimerIcon } from 'lucide-react'

export function App() {

    return (
        <>
            <Heading>
                Olá Mundo
                
                <button>
                    <TimerIcon />
                </button>
            </Heading>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, laborum doloribus perspiciatis corporis voluptatibus inventore reiciendis unde numquam dolorem consectetur pariatur ab deleniti placeat nam, nostrum porro sit vel ullam.</p>
        </>
    )
}