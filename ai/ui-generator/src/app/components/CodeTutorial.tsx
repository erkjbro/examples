'use client';

import { useState } from 'react';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';

const CodeTutorial = () => {
    const [code, setCode] = useState<string[]>([
        '<h1 class="text-red-500">Hello World</h1>'
    ]);
    const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] ?? '');
    const [codeTutorial, setCodeTutorial] = useState<string>('');

    const changeHandler = (newCode: string) => {
        setCodeToDisplay(newCode);
    }

    return (
        <main className=" min-h-screen px-4">
            <div className="w-full h-full min-h-[70vh] flex justify-between gap-x-1 ">
                <div className="w-2/3 min-h-[60vh] rounded-lg bg-white shadow-lg p-2 border mt-8 overflow-auto">
                    <div
                        className="w-full min-h-[60vh] rounded-lg"
                        dangerouslySetInnerHTML={{__html: codeToDisplay}}
                    />
                </div>
                <AceEditor
                    placeholder="Placeholder Text"
                    mode="html"
                    theme="monokai"
                    name="blah2"
                    className="w-[50%] min-h-[60vh] p-2 mt-8 rounded-lg"
                    onChange={changeHandler}
                    fontSize={14}
                    lineHeight={19}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={codeToDisplay}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
            <div className="w-10/12 mx-auto">
                <div className="mt-8">
                    <h1 className="text-white text-center text-xl font-semibold p-6">
                        Code Tutorial
                    </h1>
                    {codeTutorial ? (
                        <Markdown className="text-white">{codeTutorial}</Markdown>
                    ) : (
                        <div className="text-white">
                            The Code Tutorial Will Appear Here
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CodeTutorial;
