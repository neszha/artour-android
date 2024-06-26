<template>
    <div class="card card-transparent">
        <div class="card-body position-relative">
            <div class="position-absolute end-0 top-0 p-3">
                <!-- <div class="spinner-grow spinner-grow-sm" role="status"></div> -->
                <span class="badge bg-success f-10">SUCCESS</span>
            </div>
            <div class="text-center mt-4">
                <hr class="my-3 border border-secondary-subtle">
                <div class="row g-3">
                    <div class="col-4">
                        <h5 class="mb-0">123 KB</h5>
                        <small class="text-muted">Size</small>
                    </div>
                    <div class="col-4 border border-top-0 border-bottom-0">
                        <h5 class="mb-0">12.334</h5>
                        <small class="text-muted">Word Count</small>
                    </div>
                    <div class="col-4">
                        <h5 class="mb-0">-</h5>
                        <small class="text-muted">Similarity</small>
                    </div>
                </div>
                <hr class="my-2 border border-secondary-subtle">
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card file-card">
                    <div class="card-body">
                        <div class="text-center">
                            <img src="@assets/images/elements/task-screenshot.png" alt="img" class="img-fluid rounded border">
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4">
                            <div>
                                <h6 class="mb-0">
                                    <span class="text-truncate w-100">Document-final.docx</span>
                                </h6>
                                <p class="mb-0 text-muted">
                                    <small>16 Nov 2022</small>
                                </p>
                            </div>
                            <button class="btn btn-primary">
                                <i class="ti ti-download f-20"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card file-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- asfasdf -->
                        </div>
                        <div class="my-3 text-center">
                            <img src="https://ableproadmin.com/assets/images/application/img-file-doc.svg" alt="img"
                                class="img-fluid">
                        </div>
                        <div class="row mt-4">
                            <div class="col-12 mb-3">
                                <h6 class="mb-0"><span class="text-truncate w-100">Document-final.docx</span></h6>
                                <p class="mb-0 text-muted"><small>16 Nov 2022</small></p>
                            </div>
                            <div class="col-12 d-grid">
                                <button class="btn btn-primary">
                                    <i class="ti ti-download f-20"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card file-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <!-- asfasdf -->
                        </div>
                        <div class="my-3 text-center">
                            <img src="https://ableproadmin.com/assets/images/application/img-file-doc.svg" alt="img"
                                class="img-fluid">
                        </div>
                        <div class="row mt-4">
                            <div class="col-12 mb-3">
                                <h6 class="mb-0"><span class="text-truncate w-100">Document-final.docx</span></h6>
                                <p class="mb-0 text-muted"><small>16 Nov 2022</small></p>
                            </div>
                            <div class="col-12 d-grid">
                                <button class="btn btn-primary">
                                    <i class="ti ti-download f-20"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="alert alert-info d-flex align-items-center" role="alert">
                    <i class="ti ti-info-circle me-2 f-20"></i>
                    <span>After checking is complete, delete the task to maintain the privacy of your personal documents.</span>
                </div>
                <hr class="my-2 border border-secondary-subtle">
                <div class="d-grid mt-3">
                    <button type="button" class="btn btn-lg btn-danger waves-effect waves-light">
                        <span>Delete Task</span>
                    </button>
                </div>
                <hr class="my-3 border border-secondary-subtle">
            </div>
        </div>
    </div>
</template>
