import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"

interface DialogProps {
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  onConfirm: (confirmed: boolean) => void
  title: string
  description: string
}

export function DialogComponent({
  isDialogOpen,
  setIsDialogOpen,
  onConfirm,
  title,
  description
}: DialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-start'>
          <DialogClose>
            <Button
              type='button'
              variant='secondary'
              onClick={() => onConfirm(false)}
              className='me-4'
            >
              Cerrar
            </Button>
            <Button type='button' onClick={() => onConfirm(true)}>
              Aceptar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
