import { FC} from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

type ruleType = 'teacher' | 'student' | 'staff'

const RequireAuth: FC<{ children: React.ReactElement, rule: ruleType }> = ({ children, rule }) => {
  const {token,role} = useAppSelector(state => state.auth_provider)

  if (token == null) {
     return <Navigate to='/' replace={true}/>
  }

  if(rule != role){
    return <Navigate to='/unauthorized' replace={true}/>
  }

  return children;
};


export default RequireAuth