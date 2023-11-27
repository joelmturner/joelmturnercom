import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { TECH_VS_ICON } from './constants';
import { Portal } from '@ark-ui/react';

export function ProjectIcon({ tech }) {
  const TechIcon = TECH_VS_ICON[tech.toLowerCase()] ? TECH_VS_ICON[tech.toLowerCase()] : null;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Icon key={tech}>
          <TechIcon />
        </Icon>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          <Tooltip.Content>{tech}</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
}
