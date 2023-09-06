# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

````import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import "./App.css";
import Calender from "./components/Calendar/Calender";
import Sidebar from "./components/Sidebar/Sidebar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uid } from "uuid";
const itemsFromBackend = [
  {
    id: uid(),
    content: "recipe 1",
  },
  {
    id: uid(),
    content: "recipe 2",
  },
  {
    id: uid(),
    content: "recipe 3",
  },
];

const coloumnsFromBackend = {
  ["master"]: {
    name: "master",
    items: itemsFromBackend,
  },
  [uid()]: {
    name: "mon",
    items: [],
  },
  [uid()]: {
    name: "tue",
    items: [],
  },
  [uid()]: {
    name: "wed",
    items: [],
  },
  [uid()]: {
    name: "thirs",
    items: [],
  },
  [uid()]: {
    name: "fri",
    items: [],
  },
  [uid()]: {
    name: "sat",
    items: [],
  },
  [uid()]: {
    name: "sun",
    items: [],
  },
};

const ondragEnd = (res: any, columns: any, setColumns: any) => {
  console.log(res);
  console.log("dragHappened");

  if (!res.destination) return;
  const { source, destination } = res;

  const isMasterColumn = source.droppableId === "master";
  const isSameColumn = source.droppableId === destination.droppableId;

  if (isMasterColumn) {
    if (isSameColumn) {
      // Copy the item within the master column if it's not already there
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [item] = copiedItems.splice(source.index, 1);

      if (
        !copiedItems.some(
          (existingItem) => existingItem.content === item.content
        )
      ) {
        copiedItems.splice(destination.index, 0, { ...item, id: uid() });
      }

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      // Copy the item to the master column if it's not already there
      const destColumn = columns[destination.droppableId];
      const destItems = [...destColumn.items];
      const itemToCopy = columns[source.droppableId].items[source.index];

      if (!destItems.some((item) => item.content === itemToCopy.content)) {
        destItems.splice(destination.index, 0, {
          ...itemToCopy,
          id: uid(),
        });
        setColumns({
          ...columns,
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        });
      }
    }
  } else {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (!destItems.some((item) => item.content === removed.content)) {
      destItems.splice(destination.index, 0, removed);
    }

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(coloumnsFromBackend);
  const masterColumnId = "master";
  return (
    <>
      <div className="main_container">
        <DragDropContext
          onDragEnd={(result: any) => ondragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            const isMasterColumn = id === masterColumnId;
            return (
              <div key={id}>
                <h2>{column.name}</h2>
                <Droppable
                  droppableId={id}
                  isDropDisabled={isMasterColumn} // Disable dropping for the master column
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          margin: 4,
                          width: 250,
                          minHeight: 600,
                        }}
                      >
                        {column.items.map((item: any, index: any) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263b4a"
                                        : isMasterColumn
                                        ? "darkgray" // Set a specific background color for the master column
                                        : "456c86",
                                      margin: "0 10px 18px 0",
                                      padding: 10,
                                      minHeight: "50px",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;```
````
# recipeDashboard
# recipeDashboard
