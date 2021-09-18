<script lang="ts">
  let newItem = '';
  const vscode=acquireVsCodeApi()

  interface todo {
    text: string,
  }
	
  let todoList: Array<todo> = [];
	
	function addToList() {
		todoList = [...todoList, {text: newItem}];
    debug("Added todo:", newItem)
		newItem = '';
    saveTodos();
	}

  function saveTodos() {
    vscode.setState({todoList})
  }

  function getTodos() {
    const todos=vscode.getState()
    debug("Got todos:", todos?.todoList)
    if(todos) {
      return todos.todoList
    }
    return [];
  }
	
	function removeFromList(index: number) {
		todoList.splice(index, 1)
		todoList = todoList;
    saveTodos()
  }

  todoList=getTodos()

  function debug(...messages: Array<any>) {
    console.log("[Debug] ToDo:", ...messages);
  }
</script>

<main>
  <h3>Warning! Todos are only persisted until the tab is closed</h3>
  <br>
  <input bind:value={newItem} type="text" placeholder="New item name">
  <button on:click={addToList}>Add</button>

  <br/>
  {#each todoList as item, index}
    <span>{item.text}</span>
    <span on:click={() => removeFromList(index)}>❌</span>
    <br/>
  {/each} 
</main>
