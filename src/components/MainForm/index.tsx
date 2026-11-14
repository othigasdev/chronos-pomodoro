import { PlayCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm(){
    const taskNameInput = useRef<HTMLInputElement>(null)
    const { setState } = useTaskContext()

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if (taskNameInput.current === null) return

        const taskName = taskNameInput.current.value.trim()

        if (!taskName) {
            alert("Digite o nome da Tarefa")
            return
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration:1,
            type: "workTime"
        }

        const secondsRemaining = newTask.duration * 60

        setState(prevState => {
            return {
                ...prevState,
                config: {...prevState.config},
                activeTask: newTask,
                currentCycle: 1,
                secondsRemaining,
                formattedSecondsRemaining: "00:00",
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    return(
            <form onSubmit={handleCreateNewTask} action="" className="form">
                    <div className="formRow">
                        <Input id="meuInput" type="text" labelText="Task" placeholder='Digite sua Task' ref={taskNameInput}/>
                    </div>

                    <div className="formRow">
                        <p>
                            Próximo intervalo é de 25min
                        </p>
                    </div>

                    <div className="formRow">
                        <Cycles/>
                    </div>

                    <div className="formRow">
                        <Button icon={<PlayCircleIcon/>}/>
                    </div>
                </form>
    )
}