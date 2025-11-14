import { Modal, ModalContent } from '@heroui/modal';

type AchievementDetailModalProps = {
  achievementId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AchievementDetailModal(props: AchievementDetailModalProps) {
  const { achievementId, isOpen, onClose } = props;
  
  return <>
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <p>ああああああああああああ</p>
        <p>Achievement ID: {achievementId}</p>
      </ModalContent>
    </Modal>
  </>
}
