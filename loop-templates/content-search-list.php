<div class="row resource-row mx-0 align-items-center border-bottom mb-5 py-5">
    <div class="col-lg-9 ps-0">
        <h2 class="mb-4 mb-lg-0 fw-normal"><a class="text-decoration-none link-light" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    </div>
    <div class="col-lg-3 pe-0">
        <div class="resource-meta text-end">
            <?php if(get_the_date()): ?>
                <div class="resource-date ff-inconsolata d-inline-block mx-3">
                    <p class="mb-0 lh-1 fs-6"><?php echo get_the_date('d M Y'); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>