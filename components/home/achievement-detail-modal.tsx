import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { getAchivementMetadata } from '@/lib/front/mappers';
import { Button } from '@heroui/button';

type AchievementDetailModalProps = {
  achievementId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AchievementDetailModal(props: AchievementDetailModalProps) {
  const { achievementId, isOpen, onClose } = props;

  const metadata = achievementId ? getAchivementMetadata(achievementId) : null;

  return <>
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>
          {/* {metadata ? metadata.title : "Achievement"} */}
          <div className="flex flex-row">
            <div className={`p-4 w-20 h-15 flex items-center justify-center rounded-full ${metadata ? metadata.bgClass : ""}`}>
              {metadata ? metadata.icon : null}
            </div>
            <div className="flex flex-col justify-center ml-4">
              <h2 className="text-2xl">{metadata ? metadata.title : "Achievement"}</h2>
              <p className="text-sm text-gray-500">{metadata ? metadata.description : ""}</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          {/* detail, 獲得条件を表示 */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">獲得条件</h3>
              <p className="text-gray-700">{metadata ? metadata.condition : ""}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">説明</h3>
              <p className="text-gray-700">{metadata ? metadata.description : ""}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            color="primary"
            onPress={onClose}
          >閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
