import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectOrDelete, useTrigger } from '../../hooks'
import type { RoleName } from './index'
import { DELETE_HISTORY_BLOCK_COMMAND } from './index'
import { DotsHorizontal } from '@/app/components/base/icons/src/vender/line/general'
import { MessageClockCircle } from '@/app/components/base/icons/src/vender/solid/general'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'

type HistoryBlockComponentProps = {
  nodeKey: string
  onEditRole: () => void
  roleName?: RoleName
}

const HistoryBlockComponent: FC<HistoryBlockComponentProps> = ({
  nodeKey,
  onEditRole,
  roleName = {
    user: 'Human',
    assistant: 'Assistant',
  },
}) => {
  const { t } = useTranslation()
  const [ref, isSelected] = useSelectOrDelete(nodeKey, DELETE_HISTORY_BLOCK_COMMAND)
  const [triggerRef, open, setOpen] = useTrigger()

  return (
    <div className={`
      group inline-flex items-center pl-1 pr-0.5 h-6 border border-transparent text-[#DD2590] rounded-[5px] hover:bg-[#FCE7F6]
      ${open ? 'bg-[#FCE7F6]' : 'bg-[#FDF2FA]'}
      ${isSelected && '!border-[#F670C7]'}
    `} ref={ref}>
      <MessageClockCircle className='mr-1 w-[14px] h-[14px]' />
      <div className='mr-1 text-xs font-medium'>{t('common.promptEditor.history.item.title')}</div>
      <PortalToFollowElem
        open={open}
        onOpenChange={setOpen}
        placement='top-end'
        offset={{
          mainAxis: 4,
          alignmentAxis: -148,
        }}
      >
        <PortalToFollowElemTrigger ref={triggerRef}>
          <div className={`
            flex items-center justify-center w-[18px] h-[18px] rounded cursor-pointer
            ${open ? 'bg-[#DD2590] text-white' : 'bg-white/50 group-hover:bg-white group-hover:shadow-xs'}
          `}>
            <DotsHorizontal className='w-3 h-3' />
          </div>
        </PortalToFollowElemTrigger>
        <PortalToFollowElemContent style={{ zIndex: 100 }}>
          <div className='w-[360px] bg-white rounded-xl shadow-lg'>
            <div className='p-4'>
              <div className='mb-2 text-xs font-medium text-gray-500'>{t('common.promptEditor.history.modal.title')}</div>
              <div className='flex items-center text-sm text-gray-700'>
                <div className='mr-1 w-20 text-xs font-semibold'>{roleName.user}</div>
                {t('common.promptEditor.history.modal.user')}
              </div>
              <div className='flex items-center text-sm text-gray-700'>
                <div className='mr-1 w-20 text-xs font-semibold'>{roleName.assistant}</div>
                {t('common.promptEditor.history.modal.assistant')}
              </div>
            </div>
            <div
              className='px-4 py-3 text-xs text-[#155EEF] border-t border-black/5 rounded-b-xl cursor-pointer'
              onClick={onEditRole}
            >
              {t('common.promptEditor.history.modal.edit')}
            </div>
          </div>
        </PortalToFollowElemContent>
      </PortalToFollowElem>
    </div>
  )
}

export default HistoryBlockComponent
