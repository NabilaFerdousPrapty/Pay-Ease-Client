import React from 'react';

const Main = () => {
    return (
        <div>
            <div class="d-flex">
                <div class="flex-shrink-0">
                    <img src="#" alt="" width="300" />
                </div>
                <div class="flex-grow-1 ms-3">
                    <h5 class="mt-0">Media heading</h5>
                    <p>
                        This is some content from a media component. You can replace
                        this with any content and adjust it as needed.
                    </p>
            
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img src="#" alt="" width="" />
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h5 class="mt-0">Media heading</h5>
                            <p>
                                This is some content from a media component. You can
                                replace this with any content and adjust it as needed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Main;