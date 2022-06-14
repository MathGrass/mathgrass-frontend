import {TaskTuple} from './applicationState';

export function fetchTaskTypes(url: string): TaskTuple[]{
    const result : TaskTuple[] = [];

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            json.forEach((obj : any) => {
                const taskType : TaskTuple = {
                    identifier: obj.identifier,
                    displayName: obj.displayName
                };
                result.push(taskType);
            });
        })
        .catch((error) => {
            alert('error fetching');
        });
    return result;
}