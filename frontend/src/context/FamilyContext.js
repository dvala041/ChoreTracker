import { useReducer, createContext } from "react";

//export the context
export const FamilyContext = createContext()

const sortMembersByRole = (members) => {
    const roleOrder = ["Owner", "Admin", "Member"];
    
    return members.sort((a, b) => {
      return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
    });
  };
  

//export the reducer
export const familyReducer = (state, action) => {
    console.log('state:', state);
    console.log('state.family:', state.family);

    switch(action.type) {
        case "SET_FAMILY": //payload is an array of Users
            return {family: {...action.payload, members: sortMembersByRole(action.payload.members)}}
        case "ADD_MEMBER": //payload is a single User object
            return {...state, family: {
                ...state.family, members: sortMembersByRole([...state.family.members, action.payload])

            }}
        case "UPDATE_MEMBER": //payload is a single User object 
            return {...state, family: {
                ...state.family, members: sortMembersByRole(
                    state.family.members.map((member) =>
                      member._id === action.payload._id ? { ...member, ...action.payload } : member
                    )
                  )}
            }
            
        case "REMOVE_MEMBER": //payload is a User id
            return {...state, family: {
                ...state.family, members: state.family.members.filter((f) => f._id != action.payload)
            }}
        case "DELETE_FAMILY":
            return {family: null}
        case "UPDATE_FAMILY":
            return {...state, family: {
                ...state.family, name: action.payload
            }}

        default:
            return state
    }
}

//Export the context provider
export const FamilyContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(familyReducer, {family: null})


    
    return (
        <FamilyContext.Provider value={{...state, dispatch}}>
            {children}
        </FamilyContext.Provider>

    )
}
