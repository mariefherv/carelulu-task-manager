import styled from "styled-components";

export const NavigationBar = styled.div`
    background-color: rgba(35,170,170,1.00);
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 57%;
`;

export const NavButton = styled.div`
    display: flex;
    background-color: #feb708;
    height: 40px;
    width: 80px;
    color: #fff;
    align-items: center;
    justify-content: center;
    font-family: "Arial";
    font-size: 13px;
    border-radius: 3px;
    position: relative;
    margin: 10px 0;

    &:hover {
        cursor: pointer;
    }
`;

export const NavDropDown = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #feb708;
    color: #fff;
    margin-right: 70px;
    top: 45px;
    width: 150px;  
    z-index: 11; 

`;

export const NavDropDownItem = styled.div`
    padding: 10px;

    &:hover {
        background-color: #FFCF48;
    }
`;

export const Heading = styled.h1`
    font-size: 32px;
    text-align: center;
    margin: 30px 0 0 0;
    color: rgb(84, 84, 84);
`;

export const Subheading = styled.h3`
    font-size: 20px;
    text-align: center;
    margin: 10px 0 0;
    color: rgb(84, 84, 84);
`;

const Button = styled.button`
    color: #fff;
    border: 0px;
`;

export const CreateTaskBtn = styled(Button)`
    padding: 5px 20px;
    background-color: rgba(35,170,170);

    &:hover{
        filter: brightness(120%);
    }

    &:disabled{
        background-color: grey;
        cursor: not-allowed;
    }
`

export const Card = styled.div`
    min-height: 100px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

export const TaskTitle = styled.h4`
    font-size: 20px;
    color: #424242;
`

export const TaskNote = styled.p`
    font-size: 15px;
    color: #424242;
`

export const TaskDue = styled.div`
    font-size: 15px;
    color: #424242;
    font-style: italic;
`

export const TaskDone = styled(TaskDue)`
    color: #6ab04c;
`

export const TaskOverdue = styled(TaskDue)`
    color: #eb4d4b;
`

export const EditBtn = styled(Button)`
    width: auto;
    background-color: rgba(35,170,170);

    &:hover{
        filter: brightness(120%);
    }
`

export const DeleteBtn = styled(Button)`
    width: auto;
    background-color: #eb4d4b;

    &:hover{
        filter: brightness(120%);
    }
`

export const DoneBtn = styled(Button)`
    min-width: 140px;
    background-color: #6ab04c;

    &:hover{
        filter: brightness(120%);
    }
`

export const CreateTaskContainer = styled.div`
    height: auto;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 5%;
`

export const ModalContainer = styled.div`
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 5% 5% 15% 5%;
`

export const ModalBtn = styled(Button)`
    padding: 5px 20px;
    background-color: rgb(241, 87, 134);

    &:hover{
        filter: brightness(120%);
    }
`

export const ModalLink = styled.a`
   color: rgb(241, 87, 134);

    &:hover{
        cursor: pointer;
    }
`


