// @ts-check

// 프레임워크 없이 간단한 웹 서버 만들어보기

// 블로그 포스팅 서비스
// - 로컬 JSON 파일을 데이터베이스로 활용
// - 인증 로직은 넣지 않는다.
// - RESTful API사용.

const http = require('http');

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */

const posts = [
    {
        id: 'my_first_post',
        title: 'my first post',
        content: 'Hello!',
    },
    {
        id: 'my_second_post',
        title: 'my second post',
        content: 'Hello!',
    },
    {
        id: 'my_third_post',
        title: 'my third post',
        content: 'Hello!',
    },
];

// Posting
// GET / posts
// GET / posts/:id
// POST /posts

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
    const postIdRegexResult = (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined;

    if (req.url === '/posts' && req.method === 'GET') {
        const result = {
            totalCount: posts.length,
            result: posts.map((post) => ({ id: post.id, title: post.title })),
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; encoding=utf-8');
        res.end(JSON.stringify(result));
        // GET 포스트들 리스트 보기
    } else if (postIdRegexResult) {
        // GET 포스트 보기
        const postId = postIdRegexResult[1];
        console.log(postId, 'postId');
        res.statusCode = 200;
        res.end('포스트 보기');
    } else if (req.url === '/posts' && req.method === 'POST') {
        res.statusCode = 200;
        res.end('포스트 생성하기');
    } else {
        res.statusCode = 404;
        res.end('Not found.');
    }
});

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`연결`);
});
