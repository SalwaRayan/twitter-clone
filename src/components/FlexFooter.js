
import styled from "styled-components";;

const FlexFooter = styled.div`
  border-radius: 9999px;
  border: none;
  width: 255px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 10px;
  min-width: 52px;
  min-height: 52px;
  cursor: pointer;
  position: fixed;
  bottom: 0;
	transition-duration: 0.2s;

  &:hover {
    background-color: #e7e7e8;
  }

	@media (max-height: 334px) {
		display: none;
	}

  @media (max-width: 1280px) {
    min-width: 0;
		min-height: 0;
		width: 35px;
		height: 35px;
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
    left: 112px;
  }
`;

export {
  FlexFooter
}