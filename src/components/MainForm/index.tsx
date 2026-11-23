import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm(){
    const taskNameInput = useRef<HTMLInputElement>(null)
    const { state, dispatch } = useTaskContext()
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || ""

    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle)

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        showMessage.dismiss()

        if (taskNameInput.current === null) return

        const taskName = taskNameInput.current.value.trim()

        if (!taskName) {
            showMessage.warn("Digite o nome da Tarefa")
            return
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        }

        dispatch({type: TaskActionTypes.START_TASK, payload: newTask})

        showMessage.success("Tarefa iniciada")
    }
    
    function handleInterruptTask() {
        showMessage.dismiss()
        dispatch({type: TaskActionTypes.INTERRUPT_TASK})
        showMessage.error("Tarefa interrompida")
    }

    return(
            <form onSubmit={handleCreateNewTask} action="" className="form">
                    <div className="formRow">
                        <Input id="meuInput" type="text" labelText="Task" placeholder='Digite sua Task' ref={taskNameInput} disabled={!!state.activeTask} defaultValue={lastTaskName} />
                    </div>

                    <div className="formRow">
                        <p>
                            <Tips />
                        </p>
                    </div>

                    {state.currentCycle > 0 && (
                        <div className='formRow'>
                        <Cycles />
                        </div>
                    )}

                    <div className="formRow">
                        {!state.activeTask ? (
                            <Button key="submit-task-btn" aria-label="Iniciar nova tarefa" title="Iniciar nova tarefa" type="submit" icon={<PlayCircleIcon/>}/>
                        ) : (
                            <Button key="interrupt-task-btn" onClick={handleInterruptTask} aria-label="Interromper tarefa ativa" title="Interromper tarefa ativa" type="button" color="red" icon={<StopCircleIcon/>}/>
                        )}
                    </div>
                </form>
    )
}