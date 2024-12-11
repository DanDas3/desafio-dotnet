import { Modal } from "antd";

export type ConfirmationModalProps = {
  open: boolean,
  title: string,
  handleOk: () => void,
  setOpen: (open:boolean) => void,
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  handleOk,
  setOpen,
}) => {
  return(<Modal 
    open={open}
    title={title}
    onOk={handleOk}
    onCancel={()=>setOpen(false)}
    footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}
  />)
}

export default ConfirmationModal;