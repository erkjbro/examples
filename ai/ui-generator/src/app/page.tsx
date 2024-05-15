import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

import { CodeTutorial, Header } from './components';

const Home = () => (
    <>
        <Header />
        <CopilotKit url="/api/copilotkit">
            <CopilotSidebar
                instructions="Help the user generate code. Ask the user if to generate its tutorial."
                defaultOpen
                labels={{
                    title: 'Code & Tutorial Generator',
                    initial: 'Hi! 👋 I can help you generate code and its tutorial.'
                }}>
                <CodeTutorial />
            </CopilotSidebar>
        </CopilotKit>
    </>
);

export default Home;
