<template>
    <div>
        <courseClassificationNav />
        <div class="courseRecommended fx">
            <courseRecommended />
            <courseRecommendedRight />
        </div>
    </div>
</template>

<script>
    import courseClassificationNav from './courseClassificationNav'
    import courseRecommended from './courseRecommended'
    import courseRecommendedRight from './courseRecommendedRight'
    export default {
        components: {courseClassificationNav, courseRecommended, courseRecommendedRight}
    }
</script>

<style lang="less" scoped>
    .courseRecommended{
        width: 1200px;
        min-width: 1200px;
        justify-content: space-between;
    }
</style>
